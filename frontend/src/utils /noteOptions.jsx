import left from "/left.svg";
import center from "/center.svg";
import right from "/right.svg";
import width from "/width.svg";
import ordered_list from "/ordered_list.svg";
import bulleted_list from "/bulleted_list.svg";

export const headingOptions = [
  {
    label: "Заголовок 1",
    value: { fontSize: "2em", fontWeight: "bold", lineHeight: "1.2" },
    level: 1,
  },
  {
    label: "Заголовок 2",
    value: { fontSize: "1.5em", fontWeight: "bold", lineHeight: "1.3" },
    level: 2,
  },
  {
    label: "Заголовок 3",
    value: { fontSize: "1.17em", fontWeight: "bold", lineHeight: "1.4" },
    level: 3,
  },
  {
    label: "Заголовок 4",
    value: { fontSize: "1em", fontWeight: "bold", lineHeight: "1.5" },
    level: 4,
  },
  {
    label: "Заголовок 5",
    value: { fontSize: "0.83em", fontWeight: "bold", lineHeight: "1.6" },
    level: 5,
  },
  {
    label: "Заголовок 6",
    value: { fontSize: "0.67em", fontWeight: "bold", lineHeight: "1.7" },
    level: 6,
  },
];

export const fontOptions = [
  { label: "Inter", value: "'Inter', -apple-system, sans-serif" },
  { label: "Times New Roman", value: "'Times New Roman', Times, serif" },
  { label: "Helvetica / Arial", value: "'Helvetica', 'Arial', sans-serif" },
  {
    label: "SF Pro (San Francisco)",
    value: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  { label: "Open Sans", value: "'Open Sans', 'Helvetica Neue', sans-serif" },
];

export const textAlignOptions = [
  { label: left, value: "left" },
  { label: center, value: "center" },
  { label: right, value: "right" },
  { label: width, value: "justify" },
];

export const ListOptions = [
  { label: ordered_list, value: "ordered_list" },
  { label: bulleted_list, value: "bulleted_list" },
];
