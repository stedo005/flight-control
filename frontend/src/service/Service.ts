export function checkLogin(response: Response) {
  if (response.status === 401 || response.status === 403) {
    throw new Error("Du bist nicht angemeldet!");
  }
}

export function getBooleanFromLocalStorage(searchTerm: string | null): boolean {
  if (searchTerm === null) {
    return true
  }
  if (searchTerm === "true") {
    return true
  }
  if (searchTerm === "false") {
    return false
  } else {
    return true
  }
} 