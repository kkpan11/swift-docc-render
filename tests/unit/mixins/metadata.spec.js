/**
 * This source file is part of the Swift.org open source project
 *
 * Copyright (c) 2021 Apple Inc. and the Swift project authors
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See https://swift.org/LICENSE.txt for license information
 * See https://swift.org/CONTRIBUTORS.txt for Swift project authors
*/

import { shallowMount } from '@vue/test-utils';
import { addOrUpdateMetadata } from 'docc-render/utils/metadata';
import { defaultLocale } from 'theme/lang/index';
import metadata from 'docc-render/mixins/metadata';

jest.mock('docc-render/utils/metadata', () => ({
  addOrUpdateMetadata: jest.fn(),
}));

const pageData = {
  title: 'Title',
  description: 'Description',
  path: '/path',
};
const expectedMetadata = {
  title: pageData.title,
  description: pageData.description,
  url: `http://localhost${pageData.path}`,
  currentLocale: defaultLocale,
};

const createWrapper = ({
  description,
  disableMetadata = false,
  path,
  title,
}) => (
  shallowMount({
    name: 'TestComponent',
    mixins: [metadata],
    render() {
      return '<div/>';
    },
    computed: {
      disableMetadata: () => disableMetadata,
      pageTitle: () => title,
      pageDescription: () => description,
      references: () => ({
        'ref-d': { title: 'd' },
      }),
    },
  }, {
    mocks: {
      $route: {
        path,
      },
    },
  })
);

describe('metadata', () => {
  beforeEach(() => {
    addOrUpdateMetadata.mockClear();
  });

  it('calls addOrUpdateMetadata function when component is created', () => {
    createWrapper(pageData);
    expect(addOrUpdateMetadata).toHaveBeenCalledTimes(1);
    expect(addOrUpdateMetadata).toHaveBeenCalledWith(expectedMetadata);
  });

  it('does not call `addOrUpdateMetadata` when `disableMetadata` is true', () => {
    createWrapper({ ...pageData, disableMetadata: true });
    expect(addOrUpdateMetadata).not.toHaveBeenCalled();
  });

  describe('.extractFirstParagraphText', () => {
    it('returns the first paragraph of plaintext for a given content tree', () => {
      // A content node tree corresponding to the following markdown:
      // a _*b*_ c
      const content = [
        {
          type: 'paragraph',
          inlineContent: [
            {
              type: 'text',
              text: 'a ',
            },
            {
              type: 'emphasis',
              inlineContent: [
                {
                  type: 'strong',
                  inlineContent: [
                    {
                      type: 'text',
                      text: 'b',
                    },
                  ],
                },
              ],
            },
            {
              type: 'text',
              text: ' c ',
            },
            {
              type: 'reference',
              identifier: 'ref-d',
            },
          ],
        },
        {
          type: 'paragraph',
          inlineContent: [
            {
              type: 'text',
              text: 'blah',
            },
          ],
        },
      ];
      const wrapper = createWrapper(pageData);
      expect(wrapper.vm.extractFirstParagraphText(content)).toBe('a b c d');
      expect(wrapper.vm.extractFirstParagraphText([])).toBe('');
    });
  });
});
