import { LaneType, SingleTicket } from "../types";
import React, { FC, useContext, useEffect } from "react";
import { getTickets } from "../services/api";
import { useImmerReducer } from "use-immer";

export enum TicketActionType {
  FETCH_TICKET = "FETCH_TICKET",
  TICKET_MOVED_TO_NEW_LANE = "TICKET_MOVED_TO_NEW_LANE",
  ERROR = "ERROR",
}

type Props = {
  children: React.ReactNode;
};

export type TicketState = {
  tickets: SingleTicket[];
  error: Error | null;
  loading: boolean;
};

type TicketMovedPayload = { newLane: LaneType; ticketId: string };

export type TicketAction = {
  type: TicketActionType;
  payload?: SingleTicket[] | SingleTicket | Error | TicketMovedPayload;
};

const initialState: TicketState = { tickets: [], error: null, loading: true };
const ticketReducer = (draft: TicketState, action: TicketAction) => {
  switch (action.type) {
    case TicketActionType.FETCH_TICKET:
      draft.tickets = action.payload as SingleTicket[];
      draft.loading = false;
      return draft;
    case TicketActionType.TICKET_MOVED_TO_NEW_LANE:
      const { ticketId, newLane } = action.payload as TicketMovedPayload;
      for (const ticket of draft.tickets) {
        if (ticket.id === ticketId) {
          ticket.lane = newLane;
          break;
        }
      }
      return draft;
    case TicketActionType.ERROR:
      draft.error = action.payload as Error;
      return draft;
    default:
      return draft;
  }
};

const TicketContext = React.createContext<TicketState>(initialState);

export const useTicketContext = () => useContext(TicketContext);
const TicketDispatchContext = React.createContext<null | React.Dispatch<TicketAction>>(
  null
);

// dispatch will be initialized when this hook is called
export const useTicketContextDispatch = (): React.Dispatch<TicketAction> =>
  useContext(TicketDispatchContext) as React.Dispatch<TicketAction>;

export const TicketContextProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useImmerReducer(ticketReducer, initialState);
  useEffect(() => {
    getTickets()
      .then((tickets) =>
        dispatch({ type: TicketActionType.FETCH_TICKET, payload: tickets })
      )
      .catch((error) =>
        dispatch({ type: TicketActionType.ERROR, payload: error })
      );
  }, [dispatch]);

  return (
    <TicketDispatchContext.Provider value={dispatch}>
      <TicketContext.Provider value={state}>{children}</TicketContext.Provider>
    </TicketDispatchContext.Provider>
  );
};
