import { render } from "@testing-library/react";
import { default as Library } from '../Library/library';

describe("Library component tests:", () => {
    test("pass if library exists", () => {

        const { queryByTestId } = render(
            <Library />
        );
        expect(queryByTestId(/library/i)).toBeTruthy();
    });
})