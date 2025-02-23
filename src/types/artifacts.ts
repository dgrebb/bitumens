export type ArtifactType = "issues" | "documents" | "requirements" | "tests";
export type ArtifactMode = "compose" | "edit" | "settings";

export interface NavigationState {
  currentType: ArtifactType;
  currentMode: ArtifactMode;
}
