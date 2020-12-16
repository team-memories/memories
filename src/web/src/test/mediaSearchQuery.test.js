import React from 'react';
import { create, act } from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import { SEARCH } from '../components/Media/media-search-query';
import MediaSearchQuery from '../components/Media/media-search-query';

describe("mediaSearchQuery render test", ()=> {
  window.matchMedia = window.matchMedia || function() {
    return {
        matches : false,
        addListener : function() {},
        removeListener: function() {}
    };
  };

  const MOCKS = [
    {
      request: {
        query: SEARCH,
        variables: {
          queryStr: "test",
          location: "대한민국",
          yearFrom: 2010,
          yearTo: 2020
        }
      },
      result: {
        data: {
          search: [{ __typename: "Photo", id: "1", title: "test", thumbnailUrl: "test.thumbnailUrl", 
            originalUrl: "test.originalUrl", url: "test.url", author: [{id: "1", name: "testName", email: "test@google.com", profileImgUrl: "test@profileUrl.com"}],
            location: "대한민국", year: "2015", description: "testing", isActive: true, underProcessing: false,
            comments: [{id: "1", author: "test2Name", content: "testComment", isActive: true}], tags: [{ id: "1", name: "nature" }] }]
        }
      }
    }
  ]

  const ZERO_RESULT = [
    {
      request: {
        query: SEARCH,
        variables: {
          queryStr: "test",
          location: "대한민국",
          yearFrom: 2010,
          yearTo: 2020
        }
      },
      result: {
        data: {
          search: []
        }
      }
    }
  ]

  const ERROR_RESULT = [
    {
      request: {
        query: SEARCH,
        variables: {
          queryStr: "test",
          location: "대한민국",
          yearFrom: 2010,
          yearTo: 2020
        }
      },
      error : new Error("Network Error")
    }
  ]

  test("renders MediaSearchQuery without error", async () => {
    let component;
    act(() => {
      component = create(
        <MockedProvider mocks={MOCKS} addTypename={false}>
          <Router>
            <MediaSearchQuery title={"test"} location={"대한민국"} yearFrom={2010} yearTo={2020} />
          </Router>
        </MockedProvider>
      );
    });
    await act(async () => {
      const tree = component.toJSON();
      await expect(tree.children[1].children).toContain("Loading...");
    });
  });

  test("renders MediaSearchQuery with error", async () => {
    let component;
    act(() => {
      component = create(
        <MockedProvider mocks={ERROR_RESULT} addTypename={false}>
          <Router>
            <MediaSearchQuery title={"test"} location={"대한민국"} yearFrom={2010} yearTo={2020} />
          </Router>
        </MockedProvider>
      );
    });
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      const tree = component.toJSON();
      expect(tree.children).toContain("Error: ");
    });
  });

  test("renders MediaSearchQuery without error result length zero", async () => {
    let component;
    act(() => {
      component = create(
        <MockedProvider mocks={ZERO_RESULT} addTypename={false}>
          <Router>
            <MediaSearchQuery title={"test"} location={"대한민국"} yearFrom={2010} yearTo={2020} />
          </Router>
        </MockedProvider>
      );
    });
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      const tree = component.toJSON();
      expect(tree.children).toContain("찾은 결과가 없습니다.");
    });
  });
});