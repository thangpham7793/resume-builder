type Props = {
  actionToConfirm: string;
  consequence?: string;
};

export const actionConfirmedByUser = ({
  actionToConfirm,
  consequence,
}: Props) => {
  return window.confirm(
    `Are you sure you want to ${actionToConfirm}? ${
      consequence ? `${`This will ${consequence}`}` : ""
    }`
  );
};
