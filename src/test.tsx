import React from 'react';
import { useTranslation, Trans } from 'react-i18next'; // 1. react-i18next import 

const lngs: { [key: string]: { nativeName: string } } = { // 2. 언어 구분을 위한 lng 객체 생성
  en: { nativeName: 'English' },
  ch: { nativeName: 'Chinese' },
  ko: { nativeName: 'Korean' },
};

const Test: React.FC = () => {
  const { t, i18n } = useTranslation(); // 3. useTranslation hook 선언 

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {Object.keys(lngs).map((lng) => (
            <button
              key={lng}
              style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }}
              type="button"
              onClick={() => i18n.changeLanguage(lng)}
            > 
            {/* // 4. 버튼 클릭 시 해당 언어로 전환시킨다. */}
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
        <p>
          <Trans i18nKey="description.part1"> 
            {/* // 5. 현재 감지된 언어의 description.part1을 조회한다. */}
            Edit <code>src/App.tsx</code> and save to reload.
          </Trans>
        </p>
        <p>{t('description.part2')}</p> 
        {/* // 5. 현재 감지된 언어의 description.part2를 조회한다. */}
      </header>
    </div>
  );
};

export default Test;
