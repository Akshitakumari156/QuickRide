#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

// Function to check if a given cost 'k' is achievable
bool check(int k, const string& s, int total_ones) {
    int n = s.length();
    int zeros_in_window = 0;
    int ones_in_window = 0;
    int max_ones = 0;
    int l = 0;

    // Sliding window
    for (int r = 0; r < n; ++r) {
        if (s[r] == '0')
            zeros_in_window++;
        else
            ones_in_window++;

        while (zeros_in_window > k) {
            if (s[l] == '0')
                zeros_in_window--;
            else
                ones_in_window--;
            l++;
        }

        max_ones = max(max_ones, ones_in_window);
    }

    return max_ones >= (total_ones - k);
}

void solve() {
    string s;
    cin >> s;

    int total_ones = 0;
    for (char c : s)
        if (c == '1')
            total_ones++;

    int low = 0, high = s.length();
    int ans = s.length();

    while (low <= high) {
        int mid = low + (high - low) / 2;

        if (check(mid, s, total_ones)) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    cout << ans << endl;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        solve();
    }

    return 0;
}