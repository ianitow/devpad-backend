"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function createPath(text) {
  text = text.toLowerCase();
  text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
  text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
  text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
  text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
  text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
  text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
  text = text.replace(new RegExp(' ', 'gi'), '-');
  text = text.replace(new RegExp('[.]', 'gi'), '-');
  text = text.replace(new RegExp('[/,~!@*#$%&:;<>|]', 'gi'), '-');
  return text;
} exports.default = createPath;
