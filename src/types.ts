export enum LaneType {
  TODO = "To Do",
  IN_PROGRES = "In Progress",
  REVIEW = "Review",
  DONE = "Done",
}

export type SingleTicket = {
  id: string;
  title: string;
  body: string;
  lane: LaneType;
};

export type LaneConfig = {
  id: number;
  title: LaneType;
};

export type OnTicketDragHandler = (
  event: React.DragEvent<HTMLDivElement>,
  id: string
) => void;
