# Предварительная карта старых URL

## Актуальные назначения design-MVP

Редиректы пока не настроены. Канонические страницы программ следует брать из `src/data/programs.ts`. Основные исправления к ранней предварительной таблице:

- танцы → `/programs/tancevalnaya-gimnastika/`;
- каллиграфия и «Пишу красиво» → `/programs/kalligrafiya-i-pocherk/`;
- песочная анимация и Sand Art → `/programs/risovanie-peskom/`;
- гимнастика для ума → `/programs/gimnastika-dlya-uma/`;
- логопед → `/programs/logoped/`;
- праздники → `/events/`;
- контакты → `/contacts/`;
- неработающие программы нельзя направлять на несуществующие новые страницы: решение между релевантным каталогом и статусом 410 принимается перед запуском после SEO-проверки.

Ни один редирект не включается до резервной копии старого сайта и проверки полного перечня индексируемых URL.

Это проект миграции, а не активная конфигурация. Редиректы на первом этапе **не настроены**. Адреса назначения должны быть подтверждены после создания соответствующих страниц.

| Старый URL | Предполагаемый новый адрес | Решение |
|---|---|---|
| `/` | `/` | новая главная |
| `/news/` | `/about/news/` | архив новостей |
| `/deti_3-5_let/` | `/programs/?age=2-5` | возраст становится фильтром |
| `/razvitie-detey-s-3-let/` | `/programs/razvivayka-i-akvarelka/` | прежняя страница развития сопоставлена с подтверждённой отдельной программой |
| `/programs/razvitie-detey/` | `/programs/razvivayka-i-akvarelka/` | перенести прежний slug прототипа; настроить редирект перед публикацией |
| `/tancy/` | `/programs/tancy/` | единая программа |
| `/angliyskiy_s_4_let/` | `/programs/angliyskiy-yazyk/` | единая программа |
| `/shahmaty/` | `/programs/shahmaty/` | единая программа |
| `/new_page/` | `/programs/` | черновик; финальное решение после SEO-проверки |
| `/issledovatel_s_5_let/` | `/programs/nauchnaya-laboratoriya/` | объединить научные курсы |
| `/mama_i_malysh/` | `/programs/mama-i-malysh/` | отдельная программа |
| `/doshkolyta/` | `/programs/?age=5-7` | возраст становится фильтром |
| `/podgotovka_k_ckole/` | `/programs/podgotovka-k-shkole/` | исправить URL |
| `/kalligrafiya/` | `/programs/kalligrafiya/` | объединить с «Пишу красиво» |
| `/angliyskiy/` | `/programs/angliyskiy-yazyk/` | единая программа |
| `/tancy_6_let/` | `/programs/tancy/` | единая программа |
| `/tvorchestvo_dlya_detey_4_6_let/` | `/programs/tvorchestvo/` | единая программа |
| `/yunyie_issledovateli/` | `/programs/nauchnaya-laboratoriya/` | объединить научные курсы |
| `/teatralnyiy_kruzhok_multstudiya/` | `/programs/bloging-i-multstudiya/` | уточнить продукт |
| `/shkolniki/` | `/programs/?age=7-10` | возраст становится фильтром |
| `/isslelovateli/` | `/programs/nauchnaya-laboratoriya/` | исправить URL, объединить курс |
| `/pesochnaya_animaciya_sand_art/` | `/programs/pesochnaya-animaciya/` | единая программа |
| `/masterskaya_chudes/` | `/programs/tvorcheskaya-masterskaya/` | единая программа |
| `/shahmatye/` | `/programs/shahmaty/` | исправить URL, объединить курс |
| `/angliyskiy_na_5/` | `/programs/angliyskiy-yazyk/` | единая программа |
| `/super-prodlyonka/` | `/programs/pomoshch-v-uchebe/` | не использовать название «продлёнка» без подтверждения |
| `/pomoshch_v_podgotovke_referatov_i_proektov/` | `/programs/proektnaya-deyatelnost/` | единая учебная услуга |
| `/teatrmultstudiya/` | `/programs/bloging-i-multstudiya/` | уточнить продукт |
| `/pishu_krasivo/` | `/programs/kalligrafiya/` | объединить по возрастным группам |
| `/podrostki/` | `/programs/?age=11-17` | возраст становится фильтром |
| `/angliyskiy_yazyk_dlya_podrostkov/` | `/programs/angliyskiy-yazyk/` | единая программа |
| `/pesochnaya_animaciya/` | `/programs/pesochnaya-animaciya/` | единая программа |
| `/tvorcheskaya_masterskaya_dlya_podrostkov/` | `/programs/tvorcheskaya-masterskaya/` | единая программа |
| `/vzroslye/` | `/programs/?audience=adults` | аудитория становится фильтром |
| `/rukodelieu/` | `/programs/tvorcheskaya-masterskaya/` | исправить URL |
| `/sand_art/` | `/programs/pesochnaya-animaciya/` | единая программа |
| `/new_page_2/` | `/programs/` | пустая страница; финальное решение после SEO-проверки |
| `/skidki/` | `/offers/` | только актуальные предложения |
| `/stranovedeniekulinariyapo_miru_s_povareshkoy/` | `/events/po-miru-s-povaryoshkoy/` | короткий читаемый URL |
| `/fitnes_dlya_mam/` | `/programs/fitnes-dlya-mam/` | после подтверждения актуальности |
| `/gimnastika_dlya_uma/` | `/programs/neyrochtenie/` | подтвердить объединение |
| `/individualnye_konsultacii/` | `/specialists/` | разделить услуги специалистов |
| `/psiholog/` | `/specialists/psiholog/` | профиль специалиста/услуги |
| `/logoped/` | `/specialists/logoped/` | профиль специалиста/услуги |
| `/prazdnik/` | `/events/holidays/` | праздники и пакеты |
| `/contacts/` | `/contacts/` | карточки двух филиалов |

Перед настройкой нужны: перечень индексируемых URL из аналитики/поисковых систем, финальные slugs, статус спорных программ и правила для пустых страниц.

## Объединение каталога и раздела условий

Публичная страница `/schedule/` удалена как дублирующая каталог. Для неё настроен постоянный редирект:

| Старый URL | Новый URL | Код |
|---|---|---|
| `/schedule` | `/programs/` | 301 |
| `/schedule/` | `/programs/` | 301 |

Если при финальном SEO-аудите обнаружатся другие legacy URL общего расписания или цен без привязки к конкретному направлению, их следует направить на `/programs/`.
