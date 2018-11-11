public class euler12 {

    public static void main(String[] args) {
        int mostDivisors = 0;
        int degree = 2;
        while (mostDivisors < 500) {
            triangleNumber triangle = new triangleNumber(degree);
            int size = triangle.divisors.size();
            if (mostDivisors < size) {
                mostDivisors = size;
                System.out.println("New highest: " + triangle.number + ": " + size);
            }
            degree++;
        }
    }

}