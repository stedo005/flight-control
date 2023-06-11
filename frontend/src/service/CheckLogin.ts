export function checkLogin(response: Response) {
  if (response.status === 401 || response.status === 403) {
    throw new Error("Du bist nicht angemeldet!");
  }
}