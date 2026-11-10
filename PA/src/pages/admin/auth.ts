export const AUTH_KEY = 'punto-aliado-crm-auth'

export const logout = () => {
  sessionStorage.removeItem(AUTH_KEY)
}
