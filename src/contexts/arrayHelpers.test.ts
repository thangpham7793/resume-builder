import { deleteSnippetById, swapSnippets } from "./arrayHelpers";

import { LaneType } from "./../types";

describe("Array Helpers Test", () => {
  describe("Swap Snippets", () => {
    it("should swap two snippets in the same lane", () => {
      const snippets = [
        {
          id: "1",
          body: "body",
          lane: LaneType.Draft,
          tags: [],
        },
        {
          id: "2",
          body: "body",
          lane: LaneType.Draft,
          tags: [],
        },
        {
          id: "3",
          body: "body",
          lane: LaneType.Draft,
          tags: [],
        },
      ];

      const swapped = swapSnippets({
        snippets: [...snippets],
        currentId: "1",
        droppedId: "3",
      });

      expect(swapped[0]).toEqual(snippets[2]);
      expect(swapped[2]).toEqual(snippets[0]);
    });
  });

  describe("Delete Snippet By Id", () => {
    it("should delete the snippet with the given id", () => {
      const snippets = [
        {
          id: "1",
          body: "body",
          lane: LaneType.Draft,
          tags: [],
        },
        {
          id: "2",
          body: "body",
          lane: LaneType.Draft,
          tags: [],
        },
        {
          id: "3",
          body: "body",
          lane: LaneType.Draft,
          tags: [],
        },
      ];

      const toBeDelete = snippets[2];

      const deleted = deleteSnippetById({
        snippets,
        id: "3",
      });

      expect(deleted.length).toEqual(2);
      expect(deleted.findIndex((s) => s.id === toBeDelete.id)).toBe(-1);
    });
  });
});
