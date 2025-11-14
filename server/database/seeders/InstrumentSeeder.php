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
            Instrument::truncate();
            ini_set('memory_limit', '256M');
            Instrument::factory()->count(50)->create();
        }
    }

