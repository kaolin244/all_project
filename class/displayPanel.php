<?php

/**
 * Created by PhpStorm.
 * User: Pawel
 * Date: 2017-10-26
 * Time: 11:13
 */
class displayPanel
{
    public function getTitles()
    {
        try{
            $db = getDB();
            $stmt = $db->prepare('SELECT id_title, name, color FROM titles');
            $stmt->execute();
            $data = $stmt->fetchAll(PDO::FETCH_OBJ);
            $db = null;

            return $data;
        }
        catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }

    }
}