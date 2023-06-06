import { describe, expect, jest } from "@jest/globals";
import categoryRepositories from "../src/repositories/categoryRepositories";
import categoryServices from "../src/services/categoryServices";

describe("insertCategory", () => {
  it("should insert new Category", async () => {
    jest
      .spyOn(categoryRepositories, "verifyCategory")
      .mockResolvedValueOnce([]);
    jest
      .spyOn(categoryRepositories, "insertCategory")
      .mockResolvedValueOnce([1]);

    const result = await categoryServices.insertCategory("test");

    expect(result).toMatchObject({ id: 1, name: "test" });
  });
});

describe("updateCategory", () => {
  it("should return the updated category and the message 'categoryUpdated'", async () => {
    jest
      .spyOn(categoryRepositories, "selectCategoryById")
      .mockResolvedValueOnce([{ id: 1 }]);
    jest.spyOn(categoryRepositories, "updateCategory").mockResolvedValueOnce(1);

    const result = await categoryServices.updateCategoryById("1", "test");
    expect(result).toMatchObject({
      msg: "categoryUpdated",
      id: "1",
      name: "test",
    });
  });
});

describe("deleteCategoryById", () => {
  it("shoud return 'Categoria deletada'", async () => {
    jest
      .spyOn(categoryRepositories, "selectCategoryById")
      .mockResolvedValueOnce([{ id: 1 }]);
    jest.spyOn(categoryRepositories, "deleteCategory").mockResolvedValueOnce(1);

    const result = await categoryServices.deleteCategoryById("1");
    expect(result).toMatchObject({ msg: "Categoria deletada" });
  });
});
