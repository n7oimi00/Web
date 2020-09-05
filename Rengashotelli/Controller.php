<?php
Class Controller {
    private $model;

    public function __construct() {
        $this->model = new Model();
    }

    public function showIndex() {
        include 'views\index_view.php';
    }
}
?>