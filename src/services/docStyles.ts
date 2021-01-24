import { IStylesOptions, TabStopPosition } from "docx";

export const styles: IStylesOptions = {
  paragraphStyles: [
    {
      id: "normalPara",
      name: "Normal Para",
      basedOn: "Normal",
      next: "Normal",
      quickFormat: true,
      run: {
        font: "Calibri",
        size: 12,
      },
      paragraph: {
        spacing: {
          line: 276,
          before: 20 * 72 * 0.1,
          after: 20 * 72 * 0.05,
        },
        rightTabStop: TabStopPosition.MAX,
        leftTabStop: 453.543307087,
      },
    },
  ],
};
