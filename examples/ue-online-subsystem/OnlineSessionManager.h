#pragma once

#include "CoreMinimal.h"
#include "Interfaces/OnlineIdentityInterface.h"
#include "Interfaces/OnlineSessionInterface.h"
#include "UObject/Object.h"
#include "OnlineSessionManager.generated.h"

class IOnlineSubsystem;

UENUM(BlueprintType)
enum class EOnlineFlowState : uint8
{
	Idle,
	LoggingIn,
	LoggedIn,
	CreatingSession,
	SessionCreated,
	Searching,
	Joining,
	Connecting,
	InGame,
	DestroyingSession,
	Failed
};

UENUM(BlueprintType)
enum class ENetworkErrorLayer : uint8
{
	Identity,
	Session,
	Travel,
	Server,
	Platform,
	Deployment
};

USTRUCT(BlueprintType)
struct FRoomConfig
{
	GENERATED_BODY()

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Online")
	int32 PublicConnections = 4;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Online")
	FName MapName = TEXT("ThirdPersonMap");

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Online")
	FString BuildId = TEXT("dev");
};

USTRUCT(BlueprintType)
struct FOnlineErrorRecord
{
	GENERATED_BODY()

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Online")
	ENetworkErrorLayer Layer = ENetworkErrorLayer::Platform;

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Online")
	FString Operation;

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Online")
	FString Message;

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Online")
	FString PlatformName;
};

UCLASS(BlueprintType)
class UOnlineSessionManager : public UObject
{
	GENERATED_BODY()

public:
	UFUNCTION(BlueprintCallable, Category = "Online")
	bool Initialize();

	UFUNCTION(BlueprintCallable, Category = "Online")
	bool LoginWithAccountPortal();

	UFUNCTION(BlueprintCallable, Category = "Online")
	bool CreateRoom(const FRoomConfig& Config);

	UFUNCTION(BlueprintCallable, Category = "Online")
	bool SearchRooms();

	UFUNCTION(BlueprintCallable, Category = "Online")
	bool JoinRoom(int32 SearchResultIndex);

	UFUNCTION(BlueprintCallable, Category = "Online")
	void DestroyRoom();

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Online")
	EOnlineFlowState FlowState = EOnlineFlowState::Idle;

	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Online")
	FOnlineErrorRecord LastError;

	virtual void BeginDestroy() override;

private:
	void SetFailure(ENetworkErrorLayer Layer, const FString& Operation, const FString& Message);
	bool EnsureInitialized(const FString& Operation);
	bool EnsureWorld(const FString& Operation);
	bool IsBusy() const;
	FString GetPlatformName() const;
	FString BuildTravelMapUrl() const;

	void BindLoginDelegate();
	void ClearLoginDelegate();
	void BindCreateSessionDelegate();
	void ClearCreateSessionDelegate();
	void BindFindSessionsDelegate();
	void ClearFindSessionsDelegate();
	void BindJoinSessionDelegate();
	void ClearJoinSessionDelegate();
	void BindDestroySessionDelegate();
	void ClearDestroySessionDelegate();
	void ClearAllDelegates();

	void OnLoginComplete(int32 LocalUserNum, bool bWasSuccessful, const FUniqueNetId& UserId, const FString& Error);
	void OnCreateSessionComplete(FName SessionName, bool bWasSuccessful);
	void OnFindSessionsComplete(bool bWasSuccessful);
	void OnJoinSessionComplete(FName SessionName, EOnJoinSessionCompleteResult::Type Result);
	void OnDestroySessionComplete(FName SessionName, bool bWasSuccessful);

	IOnlineSubsystem* OnlineSubsystem = nullptr;
	IOnlineSessionPtr SessionInterface;
	IOnlineIdentityPtr IdentityInterface;
	TSharedPtr<FOnlineSessionSearch> SessionSearch;
	TArray<FOnlineSessionSearchResult> SearchResults;
	FRoomConfig PendingRoomConfig;

	FDelegateHandle LoginCompleteHandle;
	FDelegateHandle CreateSessionCompleteHandle;
	FDelegateHandle FindSessionsCompleteHandle;
	FDelegateHandle JoinSessionCompleteHandle;
	FDelegateHandle DestroySessionCompleteHandle;
};
