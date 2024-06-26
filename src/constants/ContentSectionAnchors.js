/**
 * This source file is part of the Swift.org open source project
 *
 * Copyright (c) 2022-2024 Apple Inc. and the Swift project authors
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See https://swift.org/LICENSE.txt for license information
 * See https://swift.org/CONTRIBUTORS.txt for Swift project authors
*/

import { SectionKind } from 'docc-render/constants/PrimaryContentSection';

export const MainContentSectionAnchors = {
  topics: {
    title: 'sections.topics',
    anchor: 'topics',
    level: 2,
  },
  defaultImplementations: {
    title: 'sections.default-implementations',
    anchor: 'default-implementations',
    level: 2,
  },
  relationships: {
    title: 'sections.relationships',
    anchor: 'relationships',
    level: 2,
  },
  seeAlso: {
    title: 'sections.see-also',
    anchor: 'see-also',
    level: 2,
  },
};

export const PrimaryContentSectionAnchors = {
  [SectionKind.attributes]: {
    title: 'sections.attributes',
    anchor: 'attributes',
    level: 2,
  },
  [SectionKind.details]: {
    title: 'sections.details',
    anchor: 'details',
    level: 2,
  },
  [SectionKind.parameters]: {
    title: 'sections.parameters',
    anchor: 'parameters',
    level: 2,
  },
  [SectionKind.possibleValues]: {
    title: 'sections.possible-values',
    anchor: 'possibleValues',
    level: 2,
  },
};
