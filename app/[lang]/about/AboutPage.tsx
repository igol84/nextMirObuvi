'use client'
import React, {useContext} from 'react';
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import Link from "next/link";
import {LangContext} from "@/locale/LangProvider";

const AboutPage = () => {
  const lang = useContext(LangContext)
  const d = useDictionaryTranslate("about")
  return (
    <>
      <h1>{d('welcome')}</h1>
      {lang === 'en' ? (
          <>
            <p>You can buy shoes from various manufacturers from us.<br/> Purchases will be delivered at a convenient time for you
              address
              indicated in the order.<br/>We will help you save both time and money - our prices are lower than those of ordinary
              stores.<br/> We hope that our store will prove to be a useful and economical helper in your implementation
              shopping
            </p>
            <h3>Mode of accepting orders.</h3>
            <p>Calls are accepted on weekdays <strong>from 10:00 to 18:00</strong>.<br/> Delivery in 1-2 days.<br/>
              Phone numbers for ordering <strong>(093)33-75-372 </strong><br/>e-mail:
            </p>
            <h3>How to order the product.</h3>
            - Ordering goods through the online store.
            <p>The product can be ordered through the online store by specifying your contact information. <br/>Our managers
              the nearest
              sometimes
              will process the order and contact you.</p>
            <p>-Ordering goods by phone.<br/>(093)33-75-372</p>
            <h3>Appendix.</h3>
            <p>You have the right to inspect and measure the goods at the "Nova Poshta" branch. To do this, approach the employee
              and
              calls
              number of the goods and transport number, the employee checks the availability of the goods in the warehouse and takes them out of the zone
              composition,
              after
              this You pay the specified amount in advance (the value of the goods), you are issued a parcel, check (you can
              measure),
              if
              the product does not fit, &nbsp; then you notify the employee of "Nova Poshta" LLC about this. and receive
              money
              back. IN
              in this case, the goods are returned to the Sender.
            </p>
            <h3>Discounts</h3>
            <ol>To receive, you need:
              <li>indicate in the order the same data as in the past (name, phone)</li>
              <li>after ordering, the operator will contact you, tell him that I can get a 5% discount.</li>
            </ol>
          </>
        )
        : (
          <>
            <p>У нас Ви можете придбати взуття від різних виробників.<br/> Покупки доставлять у зручний для Вас час за
              адресою
              вказаною у замовленні.<br/>Ми допоможемо Вам заощадити і час та гроші - наші ціни нижчі, ніж у звичайних
              магазинах.<br/> Сподіваємося, що наш магазин виявиться Вам корисним та економічним помічником у здійсненні
              покупок.
            </p>
            <h3>Режим прийому замовлень.</h3>
            <p>Дзвінки приймаються у будні дні <strong>з 10:00 до 18:00</strong>.<br/> Доставка 1-2 дні.<br/>
              Телефони для замовлення <strong>(093)33-75-372 </strong><br/>e-mail:
            </p>
            <h3>Як замовити товар.</h3>
            -Замовлення товарів через інтернет магазин.
            <p>Товар можна замовити через інтернет-магазин, вказавши свою контактну інформацію. <br/>Наші менеджери
              найближчим
              часом
              опрацюють замовлення та зв'яжуться з Вами.</p>
            <p>-Замовлення товарів за телефоном.<br/>(093)33-75-372</p>
            <h3>Прикладка.</h3>
            <p>У відділення "Нова Пошта" Ви маєте право оглянути та поміряти товар. Для цього підходите до співробітника
              і
              називає
              номер товарно-транспортної, співробітник перевіряє наявність товару на складі та виносить його із зони
              складу,
              після
              цього. Ви вносите авансом вказану суму (вартість товару), вам видається посилка, перевіряєте (можете
              поміряти),
              якщо
              товар не підходить, &nbsp; то ви сповіщаєте про це співробітника ТОВ &laquo;Нова Пошта&raquo; і отримуєте
              гроші
              назад. У
              такому випадку оформляється повернення товару Відправнику.
            </p>
            <h3>Скидки</h3>
            <ol>Для отримання необхідно:
              <li>вказати в замовленні ті ж дані, що й у минулому (ПІБ, телефон)</li>
              <li>після замовлення з вами зв'яжеться оператор, скажіть йому, що я можу отримати знижку 5%.</li>
            </ol>
          </>
        )}


      <Link href={`/${lang}`}>
        {d('back')}
      </Link>
    </>
  );
};

export default AboutPage;