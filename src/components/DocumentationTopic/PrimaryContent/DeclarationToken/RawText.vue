<!--
  This source file is part of the Swift.org open source project

  Copyright (c) 2021 Apple Inc. and the Swift project authors
  Licensed under Apache License v2.0 with Runtime Library Exception

  See https://swift.org/LICENSE.txt for license information
  See https://swift.org/CONTRIBUTORS.txt for Swift project authors
-->
<template>
  <span>{{text}}</span>
</template>

<script>
export default {
  name: 'RawText',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>
