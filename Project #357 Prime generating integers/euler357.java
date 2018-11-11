import java.util.ArrayList;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * euler 357
 */
public class euler357 {


    public static void main(String[] args) {
        int total = 0;
        int n = 1;
        long oldTime = 0;
        while (n <= 99999999) {
            
            if (isPrimeGenerating(n)) {
                total = total + n;
                Timestamp timestamp = new Timestamp(System.currentTimeMillis());
    
                if (timestamp.getTime() > oldTime + 1000) {
                    System.out.println(n + " - " + (n * 100 / 100_000_000) + "%, total: " + total);
                    oldTime = timestamp.getTime();
                }
            }
            n = n + 1;
        }
        System.out.println("End result: " + total);
    }

    // prime generating = every divisor d of n, d+n/d is prime
    private static boolean isPrimeGenerating(int n) {
        ArrayList<Integer> divisors = divisors(n);
        for (int divisor : divisors) {
            if (!isPrime(divisor + n / divisor)) {
                return false;
            }
        }
        return true;
    }

    private static boolean isPrime(int n) {
        int divisor = 2;
        while (divisor <= Math.sqrt(n)) {
            if (isDivisible(n, divisor)) {
                return false;
            }
            divisor++;
        }
        return true;
    }

    // not in order
    private static ArrayList<Integer> divisors(int n) {
        ArrayList<Integer> divisors = new ArrayList<Integer>();
        int divisor = 1;
        while (divisor <= Math.sqrt(n)) {
            if (isDivisible(n, divisor)) {
                divisors.add(divisor);
                if (n / divisor != divisor) {
                    divisors.add(n / divisor);
                }
            }
            divisor++;
        }
        return divisors;
    }

    // dividend is divided by the divisor
    private static boolean isDivisible(int dividend, int divisor) {
        return dividend % divisor == 0;
    }
}
