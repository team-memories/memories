import React from 'react';
import { create, act } from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import MediaCard from '../components/Media/media-card';

describe("mediaCard render test", ()=> {
  test("renders photo card without error", async () => {
    let component;
    act(() => {
      component = create(
        <Router>
          <MediaCard title={"test"} location={"test"} year={"test"}
            author={"test_user"} id={"1"} url={"test.url"} typename={"Photo"} thumbnailUrl={"test.thumbnailUrl"}/>
        </Router>
      );
    });

    await act(async () =>{
      await new Promise(resolve => setTimeout(resolve, 0));
      const tree = component.toJSON();
      expect(tree.children[0].children[0].type).toContain("img");
    });
  });

  test("renders video card without error", async () => {
    let component;
    act(() => {
      component = create(
        <Router>
          <MediaCard title={"test"} location={"test"} year={"test"}
            author={"test_user"} id={"1"} url={"test.url"} typename={"Video"} thumbnailUrl={"test.thumbnailUrl"}/>
        </Router>
      );
    });

    await act(async () =>{
      await new Promise(resolve => setTimeout(resolve, 0));
      const tree = component.toJSON();
      expect(tree.children[0].children[0].type).toContain("div");
    });
  });
});

describe("mediaCard props test", () => {
  test("mediaCard photo type props", async () => {
    let component;
    act(() => {
      component = create(
        <Router>
          <MediaCard title={"test"} location={"test"} year={"test"}
            author={"test_user"} id={"1"} url={"test.url"} typename={"Photo"} thumbnailUrl={"test.thumbnailUrl"}/>
        </Router>
      );
    });
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      const tree = component.toJSON();
      expect(tree.children[0].children[0].props.src).toContain("test.url");
    });
  });

  test("mediaCard video type props", async () => {
    let component;
    act(() => {
      component = create(
        <Router>
          <MediaCard title={"test"} location={"test"} year={"test"}
            author={"test_user"} id={"1"} url={"test.url"} typename={"Video"} thumbnailUrl={"test.thumbnailUrl"}/>
        </Router>
      );
    });
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      const tree = component.toJSON();
      expect(tree.children[0].children[0].children[0].props.src).toContain("test.thumbnailUrl");
    });
  });
});