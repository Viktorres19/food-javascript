<?php
// корректуємо дані, що приходять від клієнта перед відправкою (6)
// 4.56 коментую цю строчку та потім розкоментовую
$_POST = json_decode(file_get_contents("php://input"), true);
/* ця строка бере дані, що приходять з клієнта, перетворюють їх в строку, щоб показувати на клієнті */
echo var_dump($_POST);