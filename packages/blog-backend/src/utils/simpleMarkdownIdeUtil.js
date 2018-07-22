import SimpleMDE from 'simplemde';

export const toolbar = [
  {
    name: 'bold',
    action: SimpleMDE.toggleBold,
    className: 'fa fa-bold',
    title: 'Bold',
  },
  {
    name: 'italic',
    action: SimpleMDE.toggleItalic,
    className: 'fa fa-italic',
    title: 'Italic',
  },
  {
    name: 'heading',
    action: SimpleMDE.toggleItalic,
    className: 'fa fa-header',
    title: 'Heading',
  },
  '|',
  {
    name: 'quote',
    action: SimpleMDE.toggleBlockquote,
    className: 'fa fa-quote-left',
    title: 'Quote',
  },
  {
    name: 'unordered-list',
    action: SimpleMDE.toggleUnorderedList,
    className: 'fa fa-list-ul',
    title: 'Generic List',
  },
  {
    name: 'ordered-list',
    action: SimpleMDE.toggleOrderedList,
    className: 'fa fa-list-ol',
    title: 'Numbered List',
  },
  '|',
  {
    name: 'link',
    action: SimpleMDE.drawLink,
    className: 'fa fa-link',
    title: 'Create Link',
  },
  {
    name: 'image',
    action: SimpleMDE.drawImage,
    className: 'fa fa-picture-o',
    title: 'Insert Image',
  },
  '|',
  {
    name: 'preview',
    action: SimpleMDE.togglePreview,
    className: 'fa fa-eye no-disable',
    title: 'Toggle Preview',
  },
  {
    name: 'side-by-side',
    action: editor => {
      SimpleMDE.toggleSideBySide(editor);
      if (!editor.codemirror.getOption('fullScreen')) {
        fullScreen(editor);
      }
    },
    className: 'fa fa-columns no-disable no-mobile',
    title: 'Toggle Side by Side',
  },
  {
    name: 'fullscreen',
    action: editor => fullScreen(editor),
    className: 'fa fa-arrows-alt no-disable no-mobile',
    title: 'Toggle Fullscreen',
  },
  '|',
  {
    action: 'https://simplemde.com/markdown-guide',
    className: 'fa fa-question-circle',
    default: true,
    name: 'guide',
    title: 'Markdown Guide',
  },
];

const fullScreen = editor => {
  SimpleMDE.toggleFullScreen(editor);
  if (editor.isFullscreenActive()) {
    document.getElementsByClassName('ant-layout-sider')[0].style = 'transform: translateX(-256px)';
  } else {
    document.getElementsByClassName('ant-layout-sider')[0].style =
      'flex: 0 0 256px; max-width: 256px; min-width: 256px; width: 256px;';
  }
};
