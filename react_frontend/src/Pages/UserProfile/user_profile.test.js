import { render } from "@testing-library/react";
import { default as UserProfile } from '../UserProfile/user_profile';

describe("User profile component tests:", () => {
    test("pass if User exists", () => {

        const { queryByTestId } = render(
            <UserProfile />
        );
        expect(queryByTestId(/user/i)).toBeTruthy();
    });
})