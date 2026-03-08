'use client';

type TitleVisibility = 'always' | 'hover' | 'hidden';

type Props = {
  fixedHeight: boolean;
  titleVisibility: TitleVisibility;
  onToggleFixedHeight: () => void;
  onSetTitleVisibility: (v: TitleVisibility) => void;
  onClose: () => void;
};

export default function PageSettingsPanel({
  fixedHeight,
  titleVisibility,
  onToggleFixedHeight,
  onSetTitleVisibility,
  onClose,
}: Props) {
  return (
    <div className="page-settings-panel">
      <div className="page-settings-panel__header">
        <span className="page-settings-panel__title">Page Settings</span>
        <button
          className="btn--ghost btn--icon"
          onClick={onClose}
          aria-label="Close page settings"
        >
          &times;
        </button>
      </div>
      <div className="page-settings-panel__row">
        <div>
          <div className="page-settings-panel__label">Fixed height</div>
          <div className="page-settings-panel__desc">
            Disable page scrolling; grid fits the viewport.
          </div>
        </div>
        <button
          className={fixedHeight ? 'btn--primary' : 'btn--ghost'}
          onClick={onToggleFixedHeight}
        >
          {fixedHeight ? 'On' : 'Off'}
        </button>
      </div>
      <div className="page-settings-panel__row">
        <div className="page-settings-panel__label">Widget titles</div>
        <div className="page-settings-panel__segmented">
          {(['always', 'hover', 'hidden'] as const).map((v) => (
            <button
              key={v}
              className={titleVisibility === v ? 'btn--primary' : 'btn--ghost'}
              onClick={() => onSetTitleVisibility(v)}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
