export interface Pilot {
  rcModels: Array<RcModel>
}

export interface RcModel {
  id: string
  name: string
}

export interface Flight {
  rcModel: RcModel
  createdAt: string
}