export interface Pilot {
  id: string
  username: string
  firstname: string
  lastname: string
  rcModels: Array<RcModel>
}

export interface RcModel {
  id: string
  name: string
  pilotId: string
}

export interface Flight {
  rcModel: RcModel
  createdAt: string
}