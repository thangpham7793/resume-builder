export enum LaneType {
  Snippet = "Snippet",
  Draft = "Draft",
}

export type ISnippet = {
  id: string;
  title: string;
  body: string;
  lane: LaneType;
  tag?: string[];
};

export type LaneConfig = {
  id: number;
  title: LaneType;
};

export type OnSnippetDragHandler = (
  event: React.DragEvent<HTMLDivElement>,
  id: string
) => void;
