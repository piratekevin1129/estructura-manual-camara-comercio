<?php
$uploadDir = 'uploads/';
// Ensure the uploads directory exists and has correct permissions
$errors = array();
if (isset($_FILES['documentos'])) {
    $archivos = $_FILES['documentos'];

    foreach($archivos['name'] as $indice=>$nombre){
        $nombre_tmp = $archivos['tmp_name'][$indice];
        $error = $archivos['error'][$indice];

        if ($error === UPLOAD_ERR_OK) {
            $nombre2 = basename($nombre);
            $source = 'documentos/'.$nombre2;

            if (move_uploaded_file($nombre_tmp, $source)===false) {
                array_push($errors,'error subiendo el archivo:'.$nombre2);
            } 
        }
    }
} else {
    array_push($errors,'No hay documentos');
}

exit (json_encode(array('errors'=>$errors)));

?>