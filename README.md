# React + Vite

Brief Explanation :

------------------------------------------------------------
Tugas UAS PTI (Kelompok) : 
Christian Jovan – 00000105693
Dymasius Rendragraha - 00000106140
Alexander Andrew W – 00000107825
Muhammad Rifa'i S. H. – 00000136416
------------------------------------------------------------




READ ME!


Fitur yang diterapkan dalam web game Touhou New World : Collision of Worlds


-------------STORY-------------
1. Dalam game ini, terdapat alur cerita yang pemain harus selesaikan. Pemain dapat melanjutkan story dengan melaksanakan objektif yang ditentukan di game, ketika membuka web game ini, maka player akan langsung melihat prologue dari story game ini.

2. Story tidak hanya terjadi di 1 tempat saja, maka player harus melihat objektif untuk pergi ke tempat yang diinstruksikan dan berinteraksi dengan NPC yang diarahkan di objective untuk melanjutkan story.

3. Penyajian cerita dalam game ini menggunakan style game visual novel, dimana ada sprite karakter yang berbicara dan kalimat yang diucapkannya. 


--------SINKRONISASI WAKTU--------
1. Cara berjalannya waktu dalam game ini adalah 1 detik di dunia nyata = 1 menit waktu ingame. Setiap 24 jam di waktu game, maka hitungan day akan bertambah 1.

2. Terdapat jam di dalam game yang berfungsi sebagai penanda waktu. Terdapat 4 siklus pergantian hari yaitu pagi, siang, sore, dan malam hari.

3. Map di dalam game terdapat 4 versi, yaitu sesuai dengan 4 siklus pergantian hari di poin sebelumnya. Adapun siklus waktu untuk in game adalah : 
Malam  : 19.00 - 05.00
Pagi	 : 05.00 - 06.00
Siang	 : 06.00 - 17.00
Sore     : 17.00 - 19.00





------------STATUS BAR------------
1. Terdapat 4 status bar di dalam game , yaitu : 
1. Hunger -> Berkurang 1 setiap 3 detik waktu real life.
2. Energy -> Berkurang 1 setiap 3 detik waktu real life.
3. Hygiene -> Berkurang 1 setiap 10 detik waktu real life.
4. Happiness -> Berkurang 1 setiap 3 detik waktu real life.
Serta status money yang dimiliki oleh player 

2. Pada awal game, semua status dimulai dari 50% dan player akan memiliki 100 money.

3. Apabila salah satu dari status mencapai 0, maka akan GAME OVER. Oleh karena itu player harus memanage Waktunya dengan baik dan menjaga keseimbangan statusnya, karena ada beberapa aktivitas yang memiliki kondisi-kondisi tertentu (seperti hunger harus lebih banyak dari x point, atau hygiene harus lebih sedikit dari x point, dll.)

4. Dalam hard mode, waktu berkurangnya status juga akan lebih cepat.


-------------CHARACTERS-------------
1. Saat memulai new game, player akan ditampilkan dengan layar tampilan select character, terdapat 5 karakter yang dapat dipilih yaitu : 
a. Reimu Hakurei
b. Sakuya Izayoi
c. Remilia Scarlet
d. Yukari Yakumo
e. Flandre Scarlet

2. Pemilihan karakter tidak mempengaruhi story dari main game, namun apabila player memilih karakter Remilia, atau Flandre maka akan ada beberapa perubahan di gameplay. Beberapa fitur tambahan yang dimiliki mereka adalah : 
Apabila di siang hari, jika player menggunakan kedua character tersebut keluar dari area rumah, maka penurunan status akan lebih drastis.
Apabila player menggunakan item makanan dari inventory, maka tidak akan ada status yang bertambah.

------------GAME FEATURE------------
1. Terdapat 6 area yang player dapat kunjungi dalam game ini, serta aktivitas unik yang dapat dilakukan di masing masing tempat tersebut, yaitu :
1. Blok M,
Jalan - Jalan
Kerja di McD
Kerja di Toko Buku
Shop
Hunt blood (khusus vampire)
2. Gunung Dieng, 
Jalan - jalan
Kerja sebagai tour guide
3. Home, 
Tidur; Vampire hanya bisa tidur di pagi hari
Bath (Mandi)


4. Pantai Pangandaran,
Jalan - jalan
Kerja sebagai tour guide
Shop
5. Sunflower Field,
Jalan - jalan
Kerja sebagai tour guide
6. Scarlet Devil Mansion.
Tutorial

2. Terdapat fitur inventory yang player dapat akses dengan menekan G di keyboard. Di dalam inventory, terdapat item-item yang player telah beli dengan in game money atau dapatkan. Dengan menggunakan item yang ada, ada beberapa efek yang dapat terjadi (seperti menggunakan food item , maka status hunger akan bertambah.)

3. Terdapat tombol berwarna kuning di bagian kanan layar yang dapat ditekan oleh player. Apabila ditekan, maka game akan menampilkan objective atau misi yang player harus lakukan untuk melanjutkan gamenya.

4. Terdapat suatu kotak di bagian tengah atas game yang menandakan waktu, hari, serta score dari player disaat itu. 

5. Terdapat 2 mode difficulty yang player dapat dipilih yaitu normal mode, dan hard mode. Perbedaan utama dari kedua difficulty tersebut adalah waktu berkurangnya status bar player. 

------------GAME MOVEMENT------------
1. Dapat menggunakan keyboard dengan menekan keyboard WASD.
- Arrow Key Atas -> Menggerakan karakter ke atas 
- Arrow Key Kiri  -> Menggerakan karakter ke kiri
- Arrow Key Bawah -> Menggerakan karakter ke bawah 
- Arrow Key Kanan -> Menggerakan karakter ke kanan

2. Player dapat menekan tombol shift untuk jalan lebih cepat.

3. Tekan tombol “E” untuk interact dan “G” untuk membuka inventory.


## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
