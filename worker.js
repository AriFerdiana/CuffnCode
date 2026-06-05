// worker.js
// Node pemrosesan latar belakang (Background Processing Node)

/**
 * Simple Moving Average filter
 */
function movingAverage(data, windowSize) {
    const result = new Float32Array(data.length);
    for (let i = 0; i < data.length; i++) {
        let sum = 0;
        let count = 0;
        for (let j = Math.max(0, i - windowSize + 1); j <= i; j++) {
            sum += data[j];
            count++;
        }
        result[i] = sum / count;
    }
    return result;
}

/**
 * Simulasi IIR Notch Filter untuk 50Hz (secara kasar untuk demo)
 * Kita mensimulasikan beban komputasi berat dengan melakukan beberapa pass
 */
function simulateHeavyNotchFilter(data, passes = 10) {
    let filtered = new Float32Array(data);
    
    for (let p = 0; p < passes; p++) {
        // Beban komputasi pura-pura yang realistis pada pemrosesan sinyal
        filtered = movingAverage(filtered, 5); 
        
        // Simulasi kalkulasi matematika berat per sampel
        for (let i = 0; i < filtered.length; i++) {
            // Simulasi operasi biquad
            filtered[i] = (filtered[i] * 0.95) + (Math.sin(filtered[i]) * 0.05);
        }
    }
    return filtered;
}

// Mendengarkan pesan dari Main Thread
self.onmessage = function(e) {
    const { chunkId, data, isParallel } = e.data;
    
    // Lakukan pemrosesan
    const filteredData = simulateHeavyNotchFilter(data, 1000); // 1000 passes untuk membuat CPU load terasa & durasi pas
    
    // Cari nilai Peak (puncak) untuk keperluan estimasi BP (seperti di referensi)
    let peak = -Infinity;
    for(let i=0; i<filteredData.length; i++){
        if(filteredData[i] > peak) peak = filteredData[i];
    }
    
    // Kirim hasil kembali ke Main Thread
    self.postMessage({
        chunkId: chunkId,
        filteredData: filteredData,
        peak: peak,
        isParallel: isParallel
    });
};
