<?php
$uploadDir = 'uploads/';
// Ensure the uploads directory exists and has correct permissions
$errors = array();
$log = array();
if (isset($_FILES['documentos2'])) {
    $archivos = $_FILES['documentos2'];
    $removidos = explode(",",$_POST['removidos']);

    foreach($archivos['name'] as $indice=>$nombre){
        $nombre_tmp = $archivos['tmp_name'][$indice];
        $error = $archivos['error'][$indice];

        if ($error === UPLOAD_ERR_OK) {
            $nombre2 = basename($nombre);
            $source = 'documentos/'.$nombre2;

            //mirar que no sea uno de los removidos
            if(in_array($nombre2,$removidos)===false){
                if (move_uploaded_file($nombre_tmp, $source)===false) {
                    array_push($errors,'error subiendo el archivo:'.$nombre2);
                }
            }else{
                array_push($log,$nombre2);
            }
        }
    }
} else {
    array_push($errors,'No hay documentos');
}

exit (json_encode(array('errors'=>$errors,'log'=>$log)));

?>