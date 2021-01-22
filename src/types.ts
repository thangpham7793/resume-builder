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

type OnSnippetDraggedHandlerProps = {
  event: React.DragEvent<HTMLDivElement>;
  id: string;
  currentLane: LaneType;
};

export type OnSnippetDraggedHandler = (
  props: OnSnippetDraggedHandlerProps
) => void;

export type OnSnippetClickedHandler = (id: string) => void;
