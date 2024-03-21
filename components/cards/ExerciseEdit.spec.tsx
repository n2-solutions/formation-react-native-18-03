import { fireEvent } from "@testing-library/react-native";
import { Exercise } from "../../types/exercise";
import ExerciseEditCard from "./ExerciseEdit";
import withStyledProvider from "../../test-utils";

describe("ExerciseEditCard", () => {
  const mockExercise: Exercise = {
    id: 1,
    name: "Push-up",
    sets: 3,
    reps: 10,
    isCalisthenic: true,
  };

  // jest.fn() nous permet de tester si cette fausse fonction a été appellée
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  // tester les actions des boutons
  it("should display the correct exercise information", () => {
    const wrapper = withStyledProvider(
      <ExerciseEditCard
        exercise={mockExercise}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    expect(wrapper.getByText("Push-up")).toBeTruthy();
  });
  // ca appelle bien onDelete quand on appuie sur delete
  it("should call onDelete when delete button is pressed", () => {
    const wrapper = withStyledProvider(
      <ExerciseEditCard
        exercise={mockExercise}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    const deleteButton = wrapper.getByTestId("deleteButton");
    fireEvent.press(deleteButton);

    expect(mockOnDelete).toHaveBeenCalled();
  });

  // ca appelle bien onEdit quand on modifie le nom de l'exo
  it("should call onEdit with updated exercise name when edited", () => {
    const wrapper = withStyledProvider(
      <ExerciseEditCard
        exercise={mockExercise}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );
    // jappuie sur editer

    const editButton = wrapper.getByTestId("editButton");
    fireEvent.press(editButton);

    // je tape dans le champ
    const nameInput = wrapper.getByTestId("nameInput");
    fireEvent.changeText(nameInput, "Updated Push-up");

    // jappuie sur sauvegarder
    const saveButton = wrapper.getByTestId("saveButton");
    fireEvent.press(saveButton);

    // et ca devrait appeler onEdit
    expect(mockOnEdit).toHaveBeenCalled();
  });
});
