import { render } from "@testing-library/react";
import { default as StarRating } from '../StarRating/star_rating';

describe("Star rating component tests:", () => {
    test("pass if storyID exists", () => {
        const { queryByTestId } = render(
            <StarRating idStory={125} />
        );
        expect(queryByTestId(/idStory/i)).toBeTruthy();
    });
})