<?php
// Carpeta a comprimir
$rand_name = date('YmdHis');
$zip_name = 'descargas/documentos_'.$rand_name.'.zip';

$files_to_zip = array();
$archivos = scandir('documentos');
foreach($archivos as $archivo){
    if($archivo!='.'&&$archivo!='..'){
        array_push($files_to_zip,'documentos/'.$archivo);
    }
}
//print_r($files_to_zip);

// Crear objeto ZipArchive
$zip = new ZipArchive();
if ($zip->open($zip_name, ZipArchive::CREATE | ZipArchive::OVERWRITE) === TRUE) {

    foreach ($files_to_zip as $file) {
        if (file_exists($file)) {
            // Add the file, using just the filename as the name inside the zip
            $zip->addFile($file, basename($file));
        } else {
            //echo "File not found: $file<br>";
        }
    }
    $zip->close();
}

// Descargar el archivo ZIP
if (file_exists($zip_name)) {
    header('Content-Type: application/zip');
    header('Content-Disposition: attachment; filename="' . basename($zip_name) . '"');
    header('Content-Length: ' . filesize($zip_name));
    readfile($zip_name);
    // Opcional: eliminar el archivo ZIP después de la descarga
    // unlink($zip_file); 
    exit;
}
?>
