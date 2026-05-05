#include "OnlineSessionManager.h"

#include "Engine/Engine.h"
#include "Engine/World.h"
#include "GameFramework/PlayerController.h"
#include "OnlineSubsystem.h"
#include "OnlineSessionSettings.h"

namespace
{
	const FName GameSessionName = NAME_GameSession;
	const FName SettingMapName(TEXT("MAPNAME"));
	const FName SettingBuildId(TEXT("BUILDID"));
}

bool UOnlineSessionManager::Initialize()
{
	OnlineSubsystem = IOnlineSubsystem::Get();
	if (!OnlineSubsystem)
	{
		SetFailure(ENetworkErrorLayer::Platform, TEXT("Initialize"), TEXT("No OnlineSubsystem is loaded."));
		return false;
	}

	SessionInterface = OnlineSubsystem->GetSessionInterface();
	IdentityInterface = OnlineSubsystem->GetIdentityInterface();

	if (!SessionInterface.IsValid())
	{
		SetFailure(ENetworkErrorLayer::Session, TEXT("Initialize"), TEXT("OnlineSubsystem has no session interface."));
		return false;
	}

	if (!IdentityInterface.IsValid())
	{
		SetFailure(ENetworkErrorLayer::Identity, TEXT("Initialize"), TEXT("OnlineSubsystem has no identity interface."));
		return false;
	}

	FlowState = EOnlineFlowState::Idle;
	LastError = FOnlineErrorRecord();
	UE_LOG(LogTemp, Log, TEXT("OnlineSessionManager initialized with platform '%s'."), *GetPlatformName());
	return true;
}

void UOnlineSessionManager::BeginDestroy()
{
	ClearAllDelegates();
	Super::BeginDestroy();
}

bool UOnlineSessionManager::LoginWithAccountPortal()
{
	if (!EnsureInitialized(TEXT("LoginWithAccountPortal")))
	{
		return false;
	}

	if (OnlineSubsystem->GetSubsystemName() != TEXT("EOS"))
	{
		SetFailure(ENetworkErrorLayer::Identity, TEXT("LoginWithAccountPortal"), TEXT("AccountPortal is an EOS login flow. Steam normally uses the Steam client login state instead."));
		return false;
	}

	if (IsBusy())
	{
		SetFailure(ENetworkErrorLayer::Identity, TEXT("LoginWithAccountPortal"), TEXT("Cannot start login while another online operation is running."));
		return false;
	}

	BindLoginDelegate();

	FOnlineAccountCredentials Credentials;
	Credentials.Type = TEXT("AccountPortal");
	Credentials.Id = FString();
	Credentials.Token = FString();

	FlowState = EOnlineFlowState::LoggingIn;
	if (!IdentityInterface->Login(0, Credentials))
	{
		ClearLoginDelegate();
		SetFailure(ENetworkErrorLayer::Identity, TEXT("LoginWithAccountPortal"), TEXT("Login request was rejected by the identity interface."));
		return false;
	}

	return true;
}

bool UOnlineSessionManager::CreateRoom(const FRoomConfig& Config)
{
	if (!EnsureInitialized(TEXT("CreateRoom")))
	{
		return false;
	}

	if (!EnsureWorld(TEXT("CreateRoom")))
	{
		return false;
	}

	const TSharedPtr<const FUniqueNetId> UserId = IdentityInterface->GetUniquePlayerId(0);
	if (!UserId.IsValid())
	{
		SetFailure(ENetworkErrorLayer::Identity, TEXT("CreateRoom"), TEXT("A logged-in local user is required before CreateRoom."));
		return false;
	}

	if (FlowState == EOnlineFlowState::Idle)
	{
		FlowState = EOnlineFlowState::LoggedIn;
	}

	if (FlowState != EOnlineFlowState::LoggedIn)
	{
		SetFailure(ENetworkErrorLayer::Session, TEXT("CreateRoom"), TEXT("CreateRoom requires LoggedIn state."));
		return false;
	}

	if (Config.PublicConnections <= 0)
	{
		SetFailure(ENetworkErrorLayer::Session, TEXT("CreateRoom"), TEXT("PublicConnections must be greater than zero."));
		return false;
	}

	PendingRoomConfig = Config;

	if (SessionInterface->GetNamedSession(GameSessionName))
	{
		UE_LOG(LogTemp, Warning, TEXT("Existing session found. Destroy it before creating a new room."));
		DestroyRoom();
		return false;
	}

	FOnlineSessionSettings SessionSettings;
	SessionSettings.bIsLANMatch = false;
	SessionSettings.NumPublicConnections = Config.PublicConnections;
	SessionSettings.bShouldAdvertise = true;
	SessionSettings.bAllowJoinInProgress = true;
	SessionSettings.bAllowJoinViaPresence = true;
	SessionSettings.bUsesPresence = true;
	SessionSettings.bUseLobbiesIfAvailable = true;
	SessionSettings.bAllowInvites = true;
	SessionSettings.Set(SettingMapName, Config.MapName.ToString(), EOnlineDataAdvertisementType::ViaOnlineServiceAndPing);
	SessionSettings.Set(SettingBuildId, Config.BuildId, EOnlineDataAdvertisementType::ViaOnlineServiceAndPing);

	BindCreateSessionDelegate();
	FlowState = EOnlineFlowState::CreatingSession;

	const bool bCreateStarted = SessionInterface->CreateSession(*UserId, GameSessionName, SessionSettings);

	if (!bCreateStarted)
	{
		ClearCreateSessionDelegate();
		SetFailure(ENetworkErrorLayer::Session, TEXT("CreateRoom"), TEXT("CreateSession returned false."));
		return false;
	}

	return true;
}

bool UOnlineSessionManager::SearchRooms()
{
	if (!EnsureInitialized(TEXT("SearchRooms")))
	{
		return false;
	}

	if (IsBusy())
	{
		SetFailure(ENetworkErrorLayer::Session, TEXT("SearchRooms"), TEXT("Cannot search while another online operation is running."));
		return false;
	}

	SessionSearch = MakeShared<FOnlineSessionSearch>();
	SessionSearch->MaxSearchResults = 50;
	SessionSearch->bIsLanQuery = false;
	SessionSearch->QuerySettings.Set(SEARCH_PRESENCE, true, EOnlineComparisonOp::Equals);
#if defined(SEARCH_LOBBIES)
	SessionSearch->QuerySettings.Set(SEARCH_LOBBIES, true, EOnlineComparisonOp::Equals);
#endif

	BindFindSessionsDelegate();
	FlowState = EOnlineFlowState::Searching;
	SearchResults.Reset();

	if (!SessionInterface->FindSessions(0, SessionSearch.ToSharedRef()))
	{
		ClearFindSessionsDelegate();
		SetFailure(ENetworkErrorLayer::Session, TEXT("SearchRooms"), TEXT("FindSessions returned false."));
		return false;
	}

	return true;
}

bool UOnlineSessionManager::JoinRoom(int32 SearchResultIndex)
{
	if (!EnsureInitialized(TEXT("JoinRoom")))
	{
		return false;
	}

	if (!SearchResults.IsValidIndex(SearchResultIndex))
	{
		SetFailure(ENetworkErrorLayer::Session, TEXT("JoinRoom"), TEXT("Search result index is invalid."));
		return false;
	}

	if (!EnsureWorld(TEXT("JoinRoom")))
	{
		return false;
	}

	BindJoinSessionDelegate();
	FlowState = EOnlineFlowState::Joining;

	if (!SessionInterface->JoinSession(0, GameSessionName, SearchResults[SearchResultIndex]))
	{
		ClearJoinSessionDelegate();
		SetFailure(ENetworkErrorLayer::Session, TEXT("JoinRoom"), TEXT("JoinSession returned false."));
		return false;
	}

	return true;
}

void UOnlineSessionManager::DestroyRoom()
{
	if (!EnsureInitialized(TEXT("DestroyRoom")))
	{
		return;
	}

	if (IsBusy() && FlowState != EOnlineFlowState::DestroyingSession)
	{
		SetFailure(ENetworkErrorLayer::Session, TEXT("DestroyRoom"), TEXT("Cannot destroy a room while another online operation is running."));
		return;
	}

	if (FlowState == EOnlineFlowState::DestroyingSession)
	{
		UE_LOG(LogTemp, Warning, TEXT("DestroyRoom ignored because a destroy operation is already running."));
		return;
	}

	if (!SessionInterface->GetNamedSession(GameSessionName))
	{
		FlowState = IdentityInterface->GetUniquePlayerId(0).IsValid() ? EOnlineFlowState::LoggedIn : EOnlineFlowState::Idle;
		UE_LOG(LogTemp, Warning, TEXT("DestroyRoom called with no active session."));
		return;
	}

	BindDestroySessionDelegate();
	FlowState = EOnlineFlowState::DestroyingSession;
	if (!SessionInterface->DestroySession(GameSessionName))
	{
		ClearDestroySessionDelegate();
		SetFailure(ENetworkErrorLayer::Session, TEXT("DestroyRoom"), TEXT("DestroySession returned false."));
	}
}

void UOnlineSessionManager::SetFailure(ENetworkErrorLayer Layer, const FString& Operation, const FString& Message)
{
	LastError.Layer = Layer;
	LastError.Operation = Operation;
	LastError.Message = Message;
	LastError.PlatformName = GetPlatformName();
	FlowState = EOnlineFlowState::Failed;

	UE_LOG(LogTemp, Error, TEXT("[%s] %s failed: %s"), *LastError.PlatformName, *Operation, *Message);
}

bool UOnlineSessionManager::EnsureInitialized(const FString& Operation)
{
	if (OnlineSubsystem && SessionInterface.IsValid() && IdentityInterface.IsValid())
	{
		return true;
	}

	return Initialize();
}

bool UOnlineSessionManager::EnsureWorld(const FString& Operation)
{
	if (GetWorld())
	{
		return true;
	}

	SetFailure(ENetworkErrorLayer::Travel, Operation, TEXT("UObject has no valid UWorld."));
	return false;
}

bool UOnlineSessionManager::IsBusy() const
{
	return FlowState == EOnlineFlowState::LoggingIn
		|| FlowState == EOnlineFlowState::CreatingSession
		|| FlowState == EOnlineFlowState::Searching
		|| FlowState == EOnlineFlowState::Joining
		|| FlowState == EOnlineFlowState::Connecting
		|| FlowState == EOnlineFlowState::DestroyingSession;
}

FString UOnlineSessionManager::GetPlatformName() const
{
	return OnlineSubsystem ? OnlineSubsystem->GetSubsystemName().ToString() : TEXT("None");
}

FString UOnlineSessionManager::BuildTravelMapUrl() const
{
	const FString Map = PendingRoomConfig.MapName.IsNone()
		? FString(TEXT("ThirdPersonMap"))
		: PendingRoomConfig.MapName.ToString();

	return FString::Printf(TEXT("%s?listen"), *Map);
}

void UOnlineSessionManager::BindLoginDelegate()
{
	ClearLoginDelegate();
	LoginCompleteHandle = IdentityInterface->AddOnLoginCompleteDelegate_Handle(
		0,
		FOnLoginCompleteDelegate::CreateUObject(this, &UOnlineSessionManager::OnLoginComplete));
}

void UOnlineSessionManager::ClearLoginDelegate()
{
	if (IdentityInterface.IsValid() && LoginCompleteHandle.IsValid())
	{
		IdentityInterface->ClearOnLoginCompleteDelegate_Handle(0, LoginCompleteHandle);
	}
	LoginCompleteHandle.Reset();
}

void UOnlineSessionManager::BindCreateSessionDelegate()
{
	ClearCreateSessionDelegate();
	CreateSessionCompleteHandle = SessionInterface->AddOnCreateSessionCompleteDelegate_Handle(
		FOnCreateSessionCompleteDelegate::CreateUObject(this, &UOnlineSessionManager::OnCreateSessionComplete));
}

void UOnlineSessionManager::ClearCreateSessionDelegate()
{
	if (SessionInterface.IsValid() && CreateSessionCompleteHandle.IsValid())
	{
		SessionInterface->ClearOnCreateSessionCompleteDelegate_Handle(CreateSessionCompleteHandle);
	}
	CreateSessionCompleteHandle.Reset();
}

void UOnlineSessionManager::BindFindSessionsDelegate()
{
	ClearFindSessionsDelegate();
	FindSessionsCompleteHandle = SessionInterface->AddOnFindSessionsCompleteDelegate_Handle(
		FOnFindSessionsCompleteDelegate::CreateUObject(this, &UOnlineSessionManager::OnFindSessionsComplete));
}

void UOnlineSessionManager::ClearFindSessionsDelegate()
{
	if (SessionInterface.IsValid() && FindSessionsCompleteHandle.IsValid())
	{
		SessionInterface->ClearOnFindSessionsCompleteDelegate_Handle(FindSessionsCompleteHandle);
	}
	FindSessionsCompleteHandle.Reset();
}

void UOnlineSessionManager::BindJoinSessionDelegate()
{
	ClearJoinSessionDelegate();
	JoinSessionCompleteHandle = SessionInterface->AddOnJoinSessionCompleteDelegate_Handle(
		FOnJoinSessionCompleteDelegate::CreateUObject(this, &UOnlineSessionManager::OnJoinSessionComplete));
}

void UOnlineSessionManager::ClearJoinSessionDelegate()
{
	if (SessionInterface.IsValid() && JoinSessionCompleteHandle.IsValid())
	{
		SessionInterface->ClearOnJoinSessionCompleteDelegate_Handle(JoinSessionCompleteHandle);
	}
	JoinSessionCompleteHandle.Reset();
}

void UOnlineSessionManager::BindDestroySessionDelegate()
{
	ClearDestroySessionDelegate();
	DestroySessionCompleteHandle = SessionInterface->AddOnDestroySessionCompleteDelegate_Handle(
		FOnDestroySessionCompleteDelegate::CreateUObject(this, &UOnlineSessionManager::OnDestroySessionComplete));
}

void UOnlineSessionManager::ClearDestroySessionDelegate()
{
	if (SessionInterface.IsValid() && DestroySessionCompleteHandle.IsValid())
	{
		SessionInterface->ClearOnDestroySessionCompleteDelegate_Handle(DestroySessionCompleteHandle);
	}
	DestroySessionCompleteHandle.Reset();
}

void UOnlineSessionManager::ClearAllDelegates()
{
	ClearLoginDelegate();
	ClearCreateSessionDelegate();
	ClearFindSessionsDelegate();
	ClearJoinSessionDelegate();
	ClearDestroySessionDelegate();
}

void UOnlineSessionManager::OnLoginComplete(int32 LocalUserNum, bool bWasSuccessful, const FUniqueNetId& UserId, const FString& Error)
{
	ClearLoginDelegate();

	if (!bWasSuccessful)
	{
		SetFailure(ENetworkErrorLayer::Identity, TEXT("OnLoginComplete"), Error.IsEmpty() ? TEXT("AccountPortal login failed.") : Error);
		return;
	}

	FlowState = EOnlineFlowState::LoggedIn;
	UE_LOG(LogTemp, Log, TEXT("[%s] Login complete for user %d: %s"), *GetPlatformName(), LocalUserNum, *UserId.ToDebugString());
}

void UOnlineSessionManager::OnCreateSessionComplete(FName SessionName, bool bWasSuccessful)
{
	if (SessionName != GameSessionName)
	{
		UE_LOG(LogTemp, Warning, TEXT("Ignoring create callback for unexpected session '%s'."), *SessionName.ToString());
		return;
	}

	ClearCreateSessionDelegate();

	if (!bWasSuccessful)
	{
		SetFailure(ENetworkErrorLayer::Session, TEXT("OnCreateSessionComplete"), TEXT("CreateSession completed unsuccessfully."));
		return;
	}

	UWorld* World = GetWorld();
	if (!World)
	{
		SetFailure(ENetworkErrorLayer::Travel, TEXT("OnCreateSessionComplete"), TEXT("Cannot ServerTravel because UWorld is null."));
		return;
	}

	FlowState = EOnlineFlowState::SessionCreated;
	const FString TravelUrl = BuildTravelMapUrl();
	UE_LOG(LogTemp, Log, TEXT("[%s] Session created. ServerTravel to %s."), *GetPlatformName(), *TravelUrl);
	World->ServerTravel(TravelUrl);
	FlowState = EOnlineFlowState::InGame;
}

void UOnlineSessionManager::OnFindSessionsComplete(bool bWasSuccessful)
{
	ClearFindSessionsDelegate();

	if (!bWasSuccessful || !SessionSearch.IsValid())
	{
		SetFailure(ENetworkErrorLayer::Session, TEXT("OnFindSessionsComplete"), TEXT("FindSessions completed unsuccessfully."));
		return;
	}

	SearchResults = SessionSearch->SearchResults;
	FlowState = EOnlineFlowState::LoggedIn;
	UE_LOG(LogTemp, Log, TEXT("[%s] Found %d online sessions."), *GetPlatformName(), SearchResults.Num());
}

void UOnlineSessionManager::OnJoinSessionComplete(FName SessionName, EOnJoinSessionCompleteResult::Type Result)
{
	if (SessionName != GameSessionName)
	{
		UE_LOG(LogTemp, Warning, TEXT("Ignoring join callback for unexpected session '%s'."), *SessionName.ToString());
		return;
	}

	ClearJoinSessionDelegate();

	if (Result != EOnJoinSessionCompleteResult::Success)
	{
		SetFailure(ENetworkErrorLayer::Session, TEXT("OnJoinSessionComplete"), FString::Printf(TEXT("JoinSession result was %d."), static_cast<int32>(Result)));
		return;
	}

	FString ConnectString;
	if (!SessionInterface->GetResolvedConnectString(GameSessionName, ConnectString) || ConnectString.IsEmpty())
	{
		SetFailure(ENetworkErrorLayer::Session, TEXT("OnJoinSessionComplete"), TEXT("Could not resolve the session connect string."));
		return;
	}

	UWorld* World = GetWorld();
	if (!World)
	{
		SetFailure(ENetworkErrorLayer::Travel, TEXT("OnJoinSessionComplete"), TEXT("Cannot ClientTravel because UWorld is null."));
		return;
	}

	APlayerController* PlayerController = World->GetFirstPlayerController();
	if (!PlayerController)
	{
		SetFailure(ENetworkErrorLayer::Travel, TEXT("OnJoinSessionComplete"), TEXT("Cannot ClientTravel because no local PlayerController exists."));
		return;
	}

	FlowState = EOnlineFlowState::Connecting;
	UE_LOG(LogTemp, Log, TEXT("[%s] ClientTravel to %s."), *GetPlatformName(), *ConnectString);
	PlayerController->ClientTravel(ConnectString, TRAVEL_Absolute);
	FlowState = EOnlineFlowState::InGame;
}

void UOnlineSessionManager::OnDestroySessionComplete(FName SessionName, bool bWasSuccessful)
{
	if (SessionName != GameSessionName)
	{
		UE_LOG(LogTemp, Warning, TEXT("Ignoring destroy callback for unexpected session '%s'."), *SessionName.ToString());
		return;
	}

	ClearDestroySessionDelegate();

	if (!bWasSuccessful)
	{
		SetFailure(ENetworkErrorLayer::Session, TEXT("OnDestroySessionComplete"), TEXT("DestroySession completed unsuccessfully."));
		return;
	}

	SessionSearch.Reset();
	SearchResults.Reset();
	FlowState = IdentityInterface.IsValid() && IdentityInterface->GetUniquePlayerId(0).IsValid()
		? EOnlineFlowState::LoggedIn
		: EOnlineFlowState::Idle;

	UE_LOG(LogTemp, Log, TEXT("[%s] Session destroyed."), *GetPlatformName());
}
