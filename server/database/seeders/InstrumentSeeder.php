<?php

namespace Database\Seeders;

use App\Models\Instrument;
use App\Models\instruments;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InstrumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {


        //Seedelés tömbbel.
        // $data = [];
        // $fileNameCsv = database_path('csv/instruments.csv');

        // $rows = file($fileNameCsv, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        // for ($i = 1; $i < count($rows); $i++) {
        //     $cols = explode(';', $rows[$i]);

        //     $data[] = [
        //         'id' => (int)$cols[0],
        //         'name' => $cols[1],
        //         'description' => $cols[2],
        //         'brand' => $cols[3],
        //         'price' => (int)$cols[4],
        //         'quantity' => (int)$cols[5]
        //     ];
            // }



            $data = [];
            $filePath = database_path('csv/instruments.csv');
            $data = [];
            $header = []; // Fejlécek tárolására

            if (($handle = fopen($filePath, 'r')) !== false) {
                // 1. Beolvassuk a fejléceket (ha vannak)
                $header = fgetcsv($handle, 0, ';');

                // 2. Soronként beolvassuk az adatokat (0 azt jelenti, hogy nincs korlát a beolvasott sorra)
                while (($cols = fgetcsv($handle, 0, ';')) !== false) {
                    if (count($header) === count($cols)) {
                        // Asszociatív tömb létrehozása (jobb olvashatóság!)
                        $data[] = array_combine($header, $cols);
                    }
                }
                // 3. Zárjuk a fájlt (itt kötelező!)
                fclose($handle);
            }

            if (Instrument::count() === 0) {
                Instrument::factory()->createMany($data);
            }


            
            // ini_set('memory_limit', '256M');
            // Instrument::factory()->count(50)->create();
        }
    }

