const useIsLoading = (state: boolean) => {
    localStorage.setItem("isLoading", String(state));
    window.dispatchEvent(new Event("storage"));
};
export default useIsLoading;
