import { render, fireEvent } from "@test";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogInScreen from "src/screens/LogInScreen";
import ErrorModalScreen from "src/screens/ErrorModal";

describe("Should show error alerts when inputs are not corretly given", () => {
  const { Navigator, Screen, Group } = createNativeStackNavigator();
  const Component = () => (
    <Navigator>
      <Screen name="LogInScreen" component={LogInScreen} />
      <Group screenOptions={{ presentation: "fullScreenModal" }}>
        <Screen name="ErrorModalScreen" component={ErrorModalScreen} />
      </Group>
    </Navigator>
  );
  test("Should show two error texts when pressing submit button without typing any inputs", async () => {
    const { getByRole, findAllByRole } = render(<Component />);
    const button = getByRole("button");
    fireEvent.press(button);
    const errorTexts = await findAllByRole("alert");
    expect(errorTexts).toHaveLength(2);
    expect(errorTexts[0]).toHaveTextContent("E-Mail is required");
    expect(errorTexts[1]).toHaveTextContent("Password is required");
  });
  test("Should show error when email format is not correct", async () => {
    const { getByRole, getByTestId, findAllByRole } = render(<Component />);
    const emailInput = getByTestId("emailInput");
    const button = getByRole("button");
    fireEvent.changeText(emailInput, "a.a.a");
    fireEvent.press(button);
    const alerts = await findAllByRole("alert");
    expect(alerts[0]).toHaveTextContent("Please enter valid email");
  });
  test("Should show error when password character length is less then 6", async () => {
    const { getByRole, getByTestId, findAllByRole } = render(<Component />);
    const passwordInput = getByTestId("passwordInput");
    const button = getByRole("button");
    fireEvent.changeText(passwordInput, "12345");
    fireEvent.press(button);
    const alerts = await findAllByRole("alert");
    expect(alerts[1]).toHaveTextContent(
      "Password must be at least 6 characters"
    );
  });
  test("Should show error modal when email or password is not correct", async () => {
    const { findByRole, getByRole, getByTestId } = render(<Component />);
    const emailInput = getByTestId("emailInput");
    const passwordInput = getByTestId("passwordInput");
    const button = getByRole("button");
    fireEvent.changeText(emailInput, "wrong@mailinput.com");
    fireEvent.changeText(passwordInput, "wrongpassword");
    fireEvent.press(button);
    const errorModal = await findByRole("alert");
    expect(errorModal).toHaveTextContent("Something went wrong...");
  });
});
