import { render } from "@testing-library/react";
import { default as StoryCard } from '../StoryCard/story_card';

describe("Story card component tests:", () => {
    test("pass if story exists", () => {
        const story = {
            CommentNbr: 9,
            IDStory: 125,
            ImageBlob: "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip",
            PubDate: "2022-04-12T00:00:00.000Z",
            Score: 3.25,
            StoryName: "Moj blog",
            Summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            Username: "fran",
            warnings: []
        }
        const { queryByTestId } = render(
            <StoryCard story={story} />
        );
        expect(queryByTestId(/story/i)).toBeTruthy();
    });
})