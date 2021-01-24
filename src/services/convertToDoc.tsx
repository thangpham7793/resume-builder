import { Document, Packer, Paragraph } from "docx";

import { ISnippet } from "../types";
import { saveAs } from "file-saver";
import { styles } from "./docStyles";

export const convertToDoc = async (snippets: ISnippet[]) => {
  const doc = new Document({ styles });
  const paras = snippets.map(
    (s) =>
      new Paragraph({
        text: s.body.trim(),
        style: "normalPara",
      })
  );
  doc.addSection({ children: paras });
  const blob = await Packer.toBlob(doc);
  saveAs(blob, "my-cover-letter.docx");
};
