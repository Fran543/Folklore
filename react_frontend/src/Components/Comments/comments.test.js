import { render } from "@testing-library/react";
import { default as Comments } from '../Comments/comments';

describe("Comments component tests:", () => {
    test("pass if storyID exists", () => {

        const { queryByTestId } = render(
            <Comments idStory={125} />
        );
        expect(queryByTestId(/idStory/i)).toBeTruthy();
    });
})