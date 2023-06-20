export interface Pilot {
  id: string
  username: string
  firstname: string
  lastname: string
  roles: string[]
  rcModels: Array<RcModel>
}

export interface RcModel {
  id: string
  name: string
  pilotId: string
  description: string
}

export interface Flight {
  rcModel: RcModel
  createdAt: string
}

interface Role {
  role: string
}