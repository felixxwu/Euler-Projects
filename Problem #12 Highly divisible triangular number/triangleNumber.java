import java.util.ArrayList;
import java.util.List;
 
public class triangleNumber {
    int number;
    ArrayList<Integer> divisors;

    public triangleNumber(int degree) {
        this.number = computeTriangle(degree);
        this.divisors = computeDivisors(this.number);
    }

    private int computeTriangle(int degree) {
        int count = 1;
        int total = 0;
        while (count <= degree) {
            total = total + count;
            count++;
        }
        return total;
    }

    private ArrayList<Integer> computeDivisors(int triangleNumber) {
        ArrayList<Integer> divisors = new ArrayList<Integer>();
        int count = 1;
        while (count <= Math.sqrt(triangleNumber)) {
            if (isDivisible(triangleNumber, count)) {
                divisors.add(count);
                if (triangleNumber / count != count) {
                    divisors.add(triangleNumber / count);
                }
            }
            count++;
        }
        return divisors;
    }

    // dividend is divided by the divisor
    private static boolean isDivisible(int dividend, int divisor) {
        return dividend % divisor == 0;
    }

}