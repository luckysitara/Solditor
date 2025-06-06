export type ActionType = "file" | "shell"

export interface BaseAction {
  content: string
}

export interface FileAction extends BaseAction {
  type: "file"
  filePath: string
}

export interface ShellAction extends BaseAction {
  type: "shell"
}

export type SolditorAction = FileAction | ShellAction

export type SolditorActionData = SolditorAction | BaseAction
