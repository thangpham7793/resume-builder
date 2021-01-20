export enum LaneType {
  Snippet = "Snippet",
  Draft = "Draft",
}

export type ISnippet = {
  id: string;
  title: string;
  body: string;
  lane: LaneType;
  tags?: string[];
};

export type LaneConfig = {
  id: number;
  title: LaneType;
};

export type OnSnippetDraggedHandler = (
  event: React.DragEvent<HTMLDivElement>,
  id: string
) => void;

export type OnSnippetClickedHandler = (id: string) => void;
